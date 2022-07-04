import logo from './logo.svg';
import './App.css';
import { Container, Col, Row, Button, Form, Card, ListGroup } from "react-bootstrap";
import Film from './components/Film/Film.component';
import { useEffect, useState, createContext } from 'react';
import { service, store } from '.';
import Pagination from './components/Pagination/Pagination.component';
import FormSelectCategory from './components/Forms/FormSelectCategory.component';
import { connect } from 'react-redux';
import { REPLACE_LISTALLFILM } from './store/actionType';

export const ContextApp = createContext();

const App = ({ _listAllFilm }) => {
  const [listAllFilm, setListAllFilm] = useState([]);
  const [listFilm, setListFilm] = useState([]);
  const [listItemToDisplay, setListItemToDisplay] = useState([]);

  useEffect(() => {
    service.film.getAll()
      .then((response) => {
        store.dispatch({ type: REPLACE_LISTALLFILM, value: response });
        setListAllFilm(response);
        setListFilm(response);
        // console.log(_listAllFilm.listAllFilm);
      })
      .catch((error) => { console.error(error) });
  }, []);

  return (
    <ContextApp.Provider value={{listAllFilm, setListAllFilm, listFilm, setListFilm, listItemToDisplay, setListItemToDisplay}}>
      <div className="App">
        <Container>
          <Row>
            <FormSelectCategory />
          </Row>
          <Row className="justify-content-md-center">
            <Col md="1"></Col>
            <Col md="10">
              <Row>
                {
                  // List de tout les films
                  listItemToDisplay.length > 0 &&
                  listItemToDisplay.map((film, key) => {
                    return <Film
                      key={key}
                      filmData={film}
                    />
                  })
                }
              </Row>
            </Col>
            <Col md="1"></Col>
          </Row>
          <Row>
            <Col>
              {/* Pagination component */}
              <Pagination
                listItem={listFilm}
                listItemToDisplay={listItemToDisplay}
                setListItemToDisplay={setListItemToDisplay}
              />
            </Col>
          </Row>
        </Container>
        <footer>
        </footer>
      </div>
    </ContextApp.Provider>
  );
}

const mapStateToProps = (state) => {
  return { _listAllFilm: state.listAllFilm }
}

// const mapDispatchToProps = (dispatch) => {
//   return {

//   }
// }

export default connect(mapStateToProps)(App);
