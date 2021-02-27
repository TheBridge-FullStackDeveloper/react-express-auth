import { useForm } from 'react-hook-form';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import { UserContext } from './store';
import useAuthentication from './hooks/useAuthentication';
import './App.css';

// Esta es la forma del objeto user cuando estamos logeados
// {
//   email: '',
//   password: '',
//   username: '',
//   id: null,
// }
function App() {
  const { user, login } = useAuthentication();
  const { handleSubmit, register } = useForm();

  const handleFormSubmit = (formValues) => {
    login(formValues.email, formValues.password);
  };

  // Lo comentamos porque es un GET para probar como funciona axios
  // useEffect(() => {
  //   axios
  //     .get(API_URL)
  //     // Como el objeto response tiene la propiedad data, la destructuramos
  //     // .then((response) => {
  //     .then(({ data }) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <UserContext.Provider value={{ user, login }}>
      <div className="App">
        <Switch>
          <Route path="/profile" exact>
            {user ? (
              <h1>Bienvenid@ a mi App! {user.username}</h1>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/login" exact>
            {user ? (
              <Redirect to="/profile" />
            ) : (
              <>
                <h2>Iniciar sesión!</h2>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    ref={register({ required: true })}
                  />
                  <br />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    ref={register({ required: true })}
                  />
                  <br />
                  <button type="submit">¡Enviar! 🚀</button>
                </form>
              </>
            )}
          </Route>

          <Route path="/" exact>
            <h1>Bienvenid@ a The Bridge Auth</h1>

            <nav>
              <Link to="/login">Iniciar sesión</Link>
              <Link to="/">Registrarme</Link> {/* Completar... */}
            </nav>
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
