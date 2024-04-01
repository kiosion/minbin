defmodule Minbin.Repo.Migrations.CreatePastes do
  use Ecto.Migration

  def change do
    create table(:pastes) do
      add :uuid, :integer
      add :title, :string
      add :content, :string
      add :encrypted, :boolean, default: false, null: false
      add :burn, :boolean, default: false, null: false
      add :views, :integer
      add :owner_id, references(:users, on_delete: :nothing)

      timestamps(type: :utc_datetime)
    end

    create unique_index(:pastes, [:uuid])
    create index(:pastes, [:owner_id])
  end
end
