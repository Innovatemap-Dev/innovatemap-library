import { Component } from 'react';
import './App.css';

const BookCard = ({Title, Author, Subtitle, Cover, Status, Description}) => (
  <div className="col-sm-4">
    <div className="card">
      <img className="card-img-top cover-photo" src={Cover ? Cover[0].url : "http://placehold.jp/150x250.png"} alt="Book cover" />
      <div className="card-body">
        <h5 className="card-title">{Title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{Subtitle}</h6>
        <p className="card-text">{Author.Name/* {
        Author.forEach(author => {
          console.log(author);
          return <p className="card-text">{author}</p>
        })
        } */}</p>
        <p className="card-text">
          <small className="text-muted">{Description}</small>
        </p>
      </div>
    </div>
  </div>
);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    fetch('https://api.airtable.com/v0/app6fOS902cRMhBSw/Books?api_key=keys1vQrD6Mclwr7S')
    .then((resp) => resp.json())
    .then(data => {
      console.log(data);
      this.setState({ books: data.records });
    }).catch(err => {
      // Error
      console.log('no return in fetch');
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-10">
            <h2>Books in the Library</h2>
          </div>
          <div className="col-sm-2 d-grid">
            <button type="button" className="btn btn-primary" onClick={() => window.open("https://airtable.com/shrtX0b9EGFRVdq36", "_blank")}>Request a Book</button>
          </div>
        </div>
        <div className="row">
          {this.state.books.map(book => <BookCard {...book.fields} /> )}
        </div>
      </div>
    );
  }
}

export default App;


