import { Component } from 'react';
import './App.css';


const BookCard = ({book, authors}) => (
  <div className="col-sm-4">
    <div className="card">
      <div className="card-body">
        <img className="card-img-top cover-photo" src={book.Cover ? book.Cover[0].url : "http://placehold.jp/150x250.png"} alt="Book cover" />
        <div className="card-body">
          <h5 className="card-title">{book.Title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{book.Subtitle}</h6>
          {authors.map((item,i) => <p className="card-text">{item.fields.Name}</p>)}
          <p className="card-text">
            <small className="text-muted">{book.Description}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      authors: [],
      theWholeThang: []
    };
  }

  componentDidMount() {
    Promise.all([
      fetch('https://api.airtable.com/v0/app6fOS902cRMhBSw/Books?api_key=keys1vQrD6Mclwr7S'),
      fetch('https://api.airtable.com/v0/app6fOS902cRMhBSw/Author?api_key=keys1vQrD6Mclwr7S'),
    ])
    .then(([resp1, resp2]) => { 
      return Promise.all([
        resp1.json(), 
        resp2.json()
      ]) 
    })
    .then(([resp1, resp2]) => {
      // set state in here
      this.setState({ 
        theWholeThang: resp1.records.map((el, i) => ({ book: el, authors: resp2.records.filter((value,i) => (el.fields.Author.includes(value.id))) }))
      });
    })
    .catch(err => {
      console.log('no return in fetch' + err);
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
          {this.state.theWholeThang.map(item => <BookCard book={item.book.fields} authors={item.authors}  /> )}      
        </div>
      </div>
    );
  }
}

export default App;


