import { Component } from 'react';
import './App.css';


const BookCard = ({book, authors, people}) => (
  <div>
    <div className="card">
      <div className="position-relative">
        <div className="card-img-overlay">
          <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Checked out by: ">
            <div className="badge bg-success" >{book.Status} {people ? people.map((item,i) => <span>- {item.fields.Name}</span>) : null }</div>
            
          </span>
        </div>
        <img className="card-img-top cover-photo" src={book.Cover ? book.Cover[0].url : "http://placehold.jp/150x250.png"} alt="Book cover" />
      </div>
      <div className="card-body">
        <h5 className="card-title book-title">{book.Title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{book.Subtitle}</h6>
        <p>
        {authors.map((item,i) => <span className="badge bg-info text-dark authors">{item.fields.Name}</span>)}
        </p>
        <p className="card-text">
          <small className="text-muted">{book.Description}</small>
        </p>
      </div>
      <div className="card-footer">
        <div className="d-grid gap-2">
          <a href="#" className="btn btn-outline-primary btn-sm">Request/Check Out</a>
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
      people: [],
      theWholeThang: [],
      rows: [],
      bookRows: [],
      bookshelf: [],
    };
  }

  componentDidMount() {
    Promise.all([
      fetch('https://api.airtable.com/v0/app6fOS902cRMhBSw/Books?api_key=keys1vQrD6Mclwr7S'),
      fetch('https://api.airtable.com/v0/app6fOS902cRMhBSw/Author?api_key=keys1vQrD6Mclwr7S'),
      fetch('https://api.airtable.com/v0/app6fOS902cRMhBSw/People?api_key=keys1vQrD6Mclwr7S'),
    ])
    .then(([resp1, resp2, resp3]) => { 
      return Promise.all([
        resp1.json(), 
        resp2.json(),
        resp3.json()
      ]) 
    })
    .then(([resp1, resp2, resp3]) => {
      // set state in here
      this.setState({ 
        theWholeThang: resp1.records.map((el, i) => ({ 
          book: el, 
          authors: resp2.records.filter((value,i) => (el.fields.Author.includes(value.id))), 
          people: el.fields.RequestedorCheckedOutBy ? resp3.records.filter((value,i) => (el.fields.RequestedorCheckedOutBy.includes(value.id))) : console.log('no people')
        }))
      });
      
    })
    .catch(err => {
      console.log('no return in fetch' + err);
    });
  }
  
   /*  
    const rows = [...Array( Math.ceil(props.products.length / 4) )];
    const productRows = rows.map( (row, idx) => props.products.slice(idx * 4, idx * 4 + 4) );
    const content = productRows.map((row, idx) => (
          <div className="row" key={idx}>    
          { row.map( product => <article key={product} className="col-md-3">{ product }</article> )}
          </div> )
    );
    */
  
  buildRows () {
    this.state.rows = [...Array(Math.ceil(this.state.theWholeThang.length / 4))];
    this.state.bookRows = this.state.rows.map( (row,i) => this.state.theWholeThang.slice(i, i+4));
    //this.state.bookRows = this.state.rows.forEach(element => this.state.theWholeThang.slice(element, element+4));
    //this.state.bookRows = this.state.rows.forEach(element + >
    var x = 1;
    for ( var i = 0; i <= this.state.theWholeThang.length; i++ ) {
      if ( i % 4 == 0 ) {
        x++;
      }
      //array[x] = book[i];
    }
  
    /*this.state.bookshelf = this.state.bookRows.map((row,i) => (
      <div className="" key={i}>    
      test
      {row.map( book => <span key={book} className="col-md-3">{ book }</span> )}
      </div> )
    );*/

  }

  render() {
    
    return (
      
      <div>
        {/*this.buildRows()*/}
        <div className='d-flex align-items-end full-height'>
          <div className="align-self-end">
            <iframe src="https://giphy.com/embed/3otPoSDQczp1s9kVAQ" width="480" height="260" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p></p>
            <div className='display-2 title-top'>
              Shhhhh, you're in the library
            </div>
          </div>
        </div>
        
        <div className="container-fluid books-list">
          <div className="row push-down">
            <div className="col-sm-10">
              <h4>We got books, check em out!</h4>
            </div>
          </div>
          <div className="row">
            {/* <div id="bookshelf">
              <div className="shelf" style={{ borderTop: "8px solid #444"}}>              
                {this.state.rows.map((item,i) => 
                  <div className="column">
                      <div className="rand">
                          <div className="inside">
                            Test
                          </div>
                      </div>
                  </div>
                )}
              </div>
            </div> */}
            <div className="grid-helper">
              {this.state.theWholeThang.map(item => <BookCard book={item.book.fields} authors={item.authors} people={item.people}  /> )}      
            </div>
          </div>
        </div>
        <div className="container-fluid request-cta">
          <div className="row">
            <div className='text-center'>
              <h4>Don't see the book you're looking for?</h4>
              <button type="button" className="btn btn-primary" onClick={() => window.open("https://airtable.com/shrtX0b9EGFRVdq36", "_blank")}>Request a Book</button>
            </div>
          </div>
        </div>
        <div className="container-fluid footer">
          <div className="row">
            <div className='text-center'>
              <h4>Thanks to the gang</h4>
              <h5>Brad, Christian, Kaleem, Jeese</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


