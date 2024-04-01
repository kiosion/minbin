defmodule Minbin.Minbin.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :name, :string
    # TODO: TEMPORARY TEMPORARY THIS IS NOT SECURE
    field :password, :string, redact: true
    field :uuid, :integer

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:uuid, :name, :password])
    |> validate_required([:uuid, :name, :password])
    |> unique_constraint(:uuid)
  end
end
