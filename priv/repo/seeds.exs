# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Minbin.Repo.insert!(%Minbin.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

# Clear the database
# try to find existing uuid 1 paste, delete it if it exists
Minbin.Repo.get_by(Minbin.Minbin.Paste, uuid: 1)
|> case do
  nil -> IO.puts("No paste with uuid 1 found")
  paste -> Minbin.Repo.delete!(paste)
end

Minbin.Repo.get_by(Minbin.Minbin.User, uuid: 1)
|> case do
  nil -> IO.puts("No user with uuid 1 found")
  user -> Minbin.Repo.delete!(user)
end

# Fake user
fake_admin = Minbin.Repo.insert!(%Minbin.Minbin.User{
  name: "Admin",
  password: "password",
  uuid: 1
})

# Some fake pastes
Minbin.Repo.insert!(%Minbin.Minbin.Paste{
  title: "sometitle",
  uuid: 1,
  content:
"""
defmodule Minbin.Minbin.Paste do
  use Ecto.Schema
  import Ecto.Changeset

  schema "pastes" do
    field :title, :string
    field :uuid, :integer
    field :content, :string
    field :encrypted, :boolean, default: false
    field :burn, :boolean, default: false
    field :views, :integer
    field :owner_id, :id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(paste, attrs) do
    paste
    |> cast(attrs, [:uuid, :title, :content, :encrypted, :burn, :views])
    |> validate_required([:uuid, :title, :content, :encrypted, :burn, :views])
    |> unique_constraint(:uuid)
  end
end
""",
  encrypted: false,
  burn: false,
  views: 0,
  owner_id: fake_admin.id
})
