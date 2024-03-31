defmodule Minbin.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      MinbinWeb.Telemetry,
      Minbin.Repo,
      {DNSCluster, query: Application.get_env(:minbin, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Minbin.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: Minbin.Finch},
      # Start a worker by calling: Minbin.Worker.start_link(arg)
      # {Minbin.Worker, arg},
      # Start to serve requests, typically the last entry
      MinbinWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Minbin.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    MinbinWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
