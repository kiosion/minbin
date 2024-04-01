defmodule Minbin.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :uuid, :integer
      add :name, :string
      add :password, :string

      timestamps(type: :utc_datetime)
    end

    create unique_index(:users, [:uuid])
  end
end
