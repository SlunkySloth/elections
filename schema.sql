-- Supabase Schema for TN Election Mock Poll

-- 1. Create the votes table
create table public.votes (
  id uuid default gen_random_uuid() primary key,
  candidate_id text not null,
  district text not null,
  ward text not null,
  age_category text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS but allow anonymous inserts (since it's a public mock poll)
alter table public.votes enable row level security;
create policy "Allow anonymous inserts" on public.votes for insert with check (true);
create policy "Allow anonymous selects" on public.votes for select using (true);

-- 2. Create an aggregate vote counts table to efficiently fetch scores in realtime
create table public.vote_counts (
  candidate_id text primary key,
  total_votes integer default 0
);

-- Initialize the vote counts table
insert into public.vote_counts (candidate_id, total_votes) values
  ('tvk', 0),
  ('dmk', 0),
  ('aiadmk', 0),
  ('ntk', 0);

-- Enable realtime for vote_counts
alter publication supabase_realtime add table public.vote_counts;
alter table public.vote_counts enable row level security;
create policy "Allow anonymous selects" on public.vote_counts for select using (true);

-- 3. Create a trigger to auto-increment vote_counts when a vote is cast
create or replace function increment_vote_count()
returns trigger as $$
begin
  update public.vote_counts
  set total_votes = total_votes + 1
  where candidate_id = new.candidate_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_vote_cast
  after insert on public.votes
  for each row execute procedure increment_vote_count();
