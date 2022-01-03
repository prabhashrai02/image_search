import React, { Component } from 'react';
import './Homepage.css';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
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
                    />
                </div>
                <div className='Homepage_maincontent'>

                </div>
            </div>
        );
    }
}
 
export default Homepage;