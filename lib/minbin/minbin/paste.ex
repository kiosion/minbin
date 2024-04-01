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
