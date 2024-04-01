defmodule Minbin.Repo.Migrations.UseText do
  use Ecto.Migration

  def change do
    alter table(:pastes) do
      modify :content, :text
    end
  end
end
