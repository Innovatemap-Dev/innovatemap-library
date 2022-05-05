import { Component } from 'react';
import './App.css';

const BookCard = ({Title, Author, Subtitle, Cover, Status, Description}) => (
  <div className="col-sm-4">
    <div className="card">
      <img className="card-img-top cover-photo" src={Cover ? Cover[0].url : "http://placehold.jp/150x250.png"} alt="Book cover" />
      <div className="card-body">
        <h5 className="card-title">{Title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{Subtitle}</h6>
        <p className="card-text">{Author}</p>
        <p className="card-text">
          <small className="text-muted">{Description}</small>
        </p>
      </div>
    </div>
  </div>
);

const BookCard1 = (books) => (
  <div className="col-sm-4">
    <div className="card">
      <div className="card-body">
        {console.log(books)}
        <p>{books.Title}</p>
        <p className="card-text">{books.Name}</p>
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
        books: resp1.records,
        authors: resp2.records 
      });
    })
    .catch(err => {
      console.log('no return in fetch' + err);
    });

    
  }

  render() {
    // Trying to combine Authors & Books
    this.state.theWholeThang = this.state.books.map((el, i) => ({ book: el, authors: this.state.authors[i] }))
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
        <div className="row">
          {this.state.theWholeThang.map(book => <BookCard1 {...book.fields} /> )}
          {/*this.state.authors.map(author => <BookCard1 books={author.Books} authors={author} /> )}
          {this.state.books.map((val,index) => <BookCard1 data={val} authors={authors[index]} key={index} /> )*/
          /*
          const finalData = data.map(dataItem => {
            dataItem.condition = dataItem.condition ? rulesMap[dataItem.condition] : null;
            dataItem.helpers.map(item => {
              item.condition = item.condition ? rulesMap[item.condition] : null
            })
            return dataItem;
          });

          const { data, desc } = this.state;
          return (
              <div className="thatThingIAlwaysForgetToAddInReact">
                data.map((val, index) => <Well data={val} desc={desc[index]} key={index} onDelete={this.onDelete.bind(this)}/>
              </div>
            )
        */}
        </div>
      </div>
    );
  }
}

export default App;


