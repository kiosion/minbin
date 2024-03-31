defmodule Minbin.Repo do
  use Ecto.Repo,
    otp_app: :minbin,
    adapter: Ecto.Adapters.Postgres
end
