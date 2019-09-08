import React, { useReducer } from "react";

const Login = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    resolved: false,
    loading: false,
    error: null
  });

  const handleSubmit = e => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    setState({
      loading: true,
      resolved: false,
      error: null
    });
    window
      .fetch("/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: password.value,
          password: username.value
        })
      })
      .then(res => res.json())
      .then(user => {
        setState({ resolved: true, loading: false, error: null });
        window.localStorage.setItem("token", user.token);
      })
      .catch(error =>
        setState({ resolved: true, loading: false, error: error.message })
      );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input id="password" type="password" />
        </div>
        <button type="submit">{state.loading ? "..." : "Submit"}</button>
      </form>
      {state.error ? <div role="alert">{state.error.message}</div> : null}
      {state.resolved ? (
        <div role="alert">Congrats! You're signed in!</div>
      ) : null}
    </div>
  );
};

export default Login;
