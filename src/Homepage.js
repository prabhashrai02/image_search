import React, { Component } from 'react';
import './Homepage.css';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            pictures: [],
            textInput: "sen"
        }
    }

    componentDidMount(){
        this.ReloadImage();
    }

    ReloadImage=()=>{
        fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e52a287d86469bf01ea901dfd92cf8a5&text=:'+this.state.textInput+'&media=photos&per_page=15&page=1&format=json&nojsoncallback=1')        
        
        .then(function(response){
          return response.json();
        })
        .then(function(j){
            let picArray = j.photos.photo.map((pic) => {
                
                var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
                return(
                <img src={srcPath}></img>
                )
            })
            this.setState({pictures: picArray});
        }.bind(this))
    }

    HandleChange=(e)=>{
        this.setState({textInput: e.target.value});
    }

    Delay = (function(){
        var timer=0;
        return function(callback, ms){
            clearTimeout(timer);
            timer= setTimeout(callback, ms);
        };
    })();

    render() { 
        return (  
            <div>
                <div className='Homepage_navigation'>
                    Search Image
                    < br />
                    <input 
                        className='Navbar_search' 
                        type="text" 
                        placeholder='Search anything!!!'
                        onChange={this.HandleChange}   
                            onKeyUp={()=>this.Delay(function(){
                                this.ReloadImage();
                            }.bind(this), 0)}
                    />
                </div>
                <div className='Homepage_maincontent'>
                    {this.state.pictures}
                </div>
            </div>
        );
    }
}
 
export default Homepage;