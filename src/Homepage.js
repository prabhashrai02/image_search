import React, { Component } from 'react';
import './Homepage.css';
import InfiniteScroll from "react-infinite-scroll-component";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            pictures: [],
            textInput: "",
            page: 0,
            totalresults: 0
        }
    }
    
    componentDidMount(){
        this.ReloadImage();
    }
    
    ReloadImage=()=>{
        fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e52a287d86469bf01ea901dfd92cf8a5&text=:'+this.state.textInput+'&media=photos&per_page=15&page='+this.state.page+'&format=json&nojsoncallback=1')        
        
        .then(function(response){
            return response.json();
        })
        .then(function(j){
            let picArray = j.photos.photo.map((pic) => {
                
                var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
                return(
                    <img alt="" src={srcPath}></img>
                )
            })
            this.setState({pictures: picArray});
        }.bind(this))
    }
    
    HandleChange=(e)=>{
        this.setState({textInput: e.target.value});
        window.scrollTo(0, 0);
    }
    
    Delay = (function(){
        var timer=0;
        return function(callback, ms){
            clearTimeout(timer);
            timer= setTimeout(callback, ms);
        };
    })();

    fetchMoreData=()=>{
        this.setState({page: this.state.page+1});
        fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e52a287d86469bf01ea901dfd92cf8a5&text=:'+this.state.textInput+'&media=photos&per_page=15&page='+this.state.page+'&format=json&nojsoncallback=1')        
        
        .then(function(response){
            return response.json();
        })
        .then(function(j){
            let picArray = j.photos.photo.map((pic) => {
                
                var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
                return(
                    <img alt="" src={srcPath}></img>
                )
            })
            this.setState({
                pictures: this.state.pictures.concat(picArray),
                totalresults: this.state.pictures.length
            });
        }.bind(this))
    };
        
    render() { 
        return (  
            <div>
                <div className='Homepage_navigation'>
                    Search Image
                    <input 
                        className='Navbar_search' 
                        type="text" 
                        placeholder='Search here'
                        onChange={this.HandleChange}   
                        onKeyUp={()=>this.Delay(function(){
                            this.ReloadImage();
                        }.bind(this), 500)}
                        />
                </div>
                <div className='Homepage_maincontent'>
                    <InfiniteScroll
                        dataLength={this.state.pictures.length}
                        next={()=>this.Delay(function(){
                            this.fetchMoreData();
                        }.bind(this), 3000)}
                        hasMore={this.state.pictures.length !== this.state.totalresults}
                        loader= {
                            <div className='Homepage_loader'></div>
                        }
                    >
                        
                        <div className='arrange'>
                            {this.state.pictures.map(pic => (
                                <div className='Maincontent_image'>
                                    {pic}
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}
 
export default Homepage;