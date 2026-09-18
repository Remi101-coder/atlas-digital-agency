create extension if not exists pgcrypto;

create type public.app_role as enum ('admin', 'editor');
create type public.blog_post_status as enum ('draft', 'published', 'archived');
create type public.portfolio_project_status as enum ('draft', 'published', 'archived');

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role public.app_role not null default 'editor',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_categories_name_not_empty check (length(trim(name)) > 0),
  constraint blog_categories_slug_not_empty check (length(trim(slug)) > 0)
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  featured_image_url text,
  author_id uuid not null references public.profiles (id) on delete cascade,
  category_id uuid references public.blog_categories (id) on delete set null,
  status public.blog_post_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_posts_title_not_empty check (length(trim(title)) > 0),
  constraint blog_posts_slug_not_empty check (length(trim(slug)) > 0),
  constraint blog_posts_content_not_empty check (length(trim(content)) > 0)
);

create table if not exists public.portfolio_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint portfolio_categories_name_not_empty check (length(trim(name)) > 0),
  constraint portfolio_categories_slug_not_empty check (length(trim(slug)) > 0)
);

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  client text,
  industry text,
  short_description text,
  description text,
  challenge text,
  solution text,
  results text,
  services text[] not null default '{}',
  featured_image_url text,
  gallery jsonb not null default '[]'::jsonb,
  status public.portfolio_project_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint portfolio_projects_title_not_empty check (length(trim(title)) > 0),
  constraint portfolio_projects_slug_not_empty check (length(trim(slug)) > 0)
);

create index if not exists idx_blog_posts_slug on public.blog_posts (slug);
create index if not exists idx_blog_posts_status on public.blog_posts (status);
create index if not exists idx_blog_posts_published_at on public.blog_posts (published_at desc);
create index if not exists idx_blog_posts_category_id on public.blog_posts (category_id);
create index if not exists idx_blog_posts_author_id on public.blog_posts (author_id);

create index if not exists idx_portfolio_categories_slug on public.portfolio_categories (slug);
create index if not exists idx_portfolio_projects_slug on public.portfolio_projects (slug);
create index if not exists idx_portfolio_projects_status on public.portfolio_projects (status);
create index if not exists idx_portfolio_projects_created_at on public.portfolio_projects (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      concat_ws(
        ' ',
        nullif(new.raw_user_meta_data ->> 'first_name', ''),
        nullif(new.raw_user_meta_data ->> 'last_name', '')
      ),
      new.email
    ),
    nullif(new.raw_user_meta_data ->> 'avatar_url', ''),
    'editor'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.is_editor_or_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('editor', 'admin')
  );
$$;

create trigger trg_profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create trigger trg_blog_categories_set_updated_at
before update on public.blog_categories
for each row
execute function public.set_updated_at();

create trigger trg_blog_posts_set_updated_at
before update on public.blog_posts
for each row
execute function public.set_updated_at();

create trigger trg_portfolio_categories_set_updated_at
before update on public.portfolio_categories
for each row
execute function public.set_updated_at();

create trigger trg_portfolio_projects_set_updated_at
before update on public.portfolio_projects
for each row
execute function public.set_updated_at();

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_posts enable row level security;
alter table public.portfolio_categories enable row level security;
alter table public.portfolio_projects enable row level security;

create policy "Public can view published blog posts"
on public.blog_posts for select
to public
using (status = 'published' and published_at is not null and published_at <= now());

create policy "Public can view public blog categories"
on public.blog_categories for select
to public
using (true);

create policy "Public can view published portfolio projects"
on public.portfolio_projects for select
to public
using (status = 'published');

create policy "Public can view public portfolio categories"
on public.portfolio_categories for select
to public
using (true);

create policy "Admins can manage profiles"
on public.profiles for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Users can view their own profile"
on public.profiles for select
to authenticated
using (id = auth.uid());

create policy "Users can update their own profile without changing role"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (
  id = auth.uid()
  and role = (select role from public.profiles where id = auth.uid())
);

create policy "Editors and admins can view all blog content"
on public.blog_posts for select
to authenticated
using (public.is_editor_or_admin());

create policy "Editors can create blog posts for themselves"
on public.blog_posts for insert
to authenticated
with check (
  public.is_editor_or_admin()
  and author_id = auth.uid()
);

create policy "Editors can update their own blog posts"
on public.blog_posts for update
to authenticated
using (
  public.is_editor_or_admin()
  and (
    author_id = auth.uid()
    or public.is_admin()
  )
)
with check (
  public.is_editor_or_admin()
  and (
    author_id = auth.uid()
    or public.is_admin()
  )
);

create policy "Admins can delete any blog post"
on public.blog_posts for delete
to authenticated
using (public.is_admin());

create policy "Editors can delete their own blog posts"
on public.blog_posts for delete
to authenticated
using (
  public.is_editor_or_admin()
  and author_id = auth.uid()
);

create policy "Editors and admins can manage blog categories"
on public.blog_categories for all
to authenticated
using (public.is_editor_or_admin())
with check (public.is_editor_or_admin());

create policy "Editors and admins can view all portfolio projects"
on public.portfolio_projects for select
to authenticated
using (public.is_editor_or_admin());

create policy "Editors can create portfolio projects"
on public.portfolio_projects for insert
to authenticated
with check (public.is_editor_or_admin());

create policy "Editors can update portfolio projects"
on public.portfolio_projects for update
to authenticated
using (public.is_editor_or_admin())
with check (public.is_editor_or_admin());

create policy "Admins can delete any portfolio project"
on public.portfolio_projects for delete
to authenticated
using (public.is_admin());

create policy "Editors can delete portfolio projects"
on public.portfolio_projects for delete
to authenticated
using (public.is_editor_or_admin());

create policy "Editors and admins can manage portfolio categories"
on public.portfolio_categories for all
to authenticated
using (public.is_editor_or_admin())
with check (public.is_editor_or_admin());
