import React, {Component} from "react";
import Header from "../Header/Header";
import Card from "../Card/Card";

class Main extends Component {
    constructor(){
        super();
        this.state={
            artists:[],
            resultsPerPage: 10,
            order: false,

        }
    }

    componentDidMount(){
        console.log('DidMount');
        let proxy = 'https://thingproxy.freeboard.io/fetch/'
        let url = proxy + 'https://api.deezer.com/chart/0/artists&top?limit='+ this.state.resultsPerPage;
        fetch(url)
            .then( response => response.json())
            .then( data => {
                console.log(data.data);

                this.setState({
                    artists:data.data
                })
            })
            .catch( e=>console.log(e))
    }

    removeCard(id){
        let artists = this.state.artists.filter(artist => id !== artist.id);

        this.setState({
            artists: artists,
        })
    }

    order(){
        console.log('Dentro de order');
        let artistasOrdenados = []
        if(this.state.order === false || this.state.order === 'desc'){
            console.log('Dentro del 1er if');
            artistasOrdenados = this.state.artists.sort( function(a,b){
                if (a.name > b.name){
                    return 1;
                } 
                if (a.name < b.name){
                    return -1;
                } 
                return 0
            });
            this.setState({
                order: 'asc',
                artists: artistasOrdenados
            })
            console.log(artistasOrdenados);
        }
        if (this.state.order === 'asc'){
            console.log('Dentro del 2do if');
            let artistasOrdenados = this.state.artists.reverse();
            this.setState({
                order: 'desc',
                artists: artistasOrdenados
            })
        }
    }

    moveRight(id){
        console.log("right");
        //Obtengo el índice el elemento en el array
        let artistIndexInArray = this.state.artists.findIndex( artist => artist.id === id);
        //Obtengo el elemento del array
        let artist = this.state.artists.find( artist => artist.id === id);
        //let artists = this.state.artists;
    
        //Saco el elemento del array
        this.state.artists.splice(artistIndexInArray,1);
        //Aumento el indice obtenido en 1
        artistIndexInArray++
        //Colocamos el artista en la nueva posición del array
        this.state.artists.splice(artistIndexInArray,0, artist)

        this.setState({
            artists: this.state.artists,
        })
    }

        moveLeft(id){
        console.log("left");
        //Obtengo el índice el elemento en el array
        let artistIndexInArray = this.state.artists.findIndex( artist => artist.id === id);
        //Obtengo el elemento del array
        let artist = this.state.artists.find( artist => artist.id === id);
        let artists = this.state.artists;
    
        //Saco el elemento del array
        artists.splice(artistIndexInArray,1);
        //Aumento el indice obtenido en 1
        artistIndexInArray--
        //Colocamos el artista en la nueva posición del array
        artists.splice(artistIndexInArray,0, artist)

        this.setState({
            artists: artists,
        })
    }

    render(){
        return(
            <React.Fragment>
            <Header order={()=>this.order()}/>
            <main>
                <button type="button">Cargar más tarjetas</button>
                <section className="card-container">
                    {
                        this.state.artists.map( artist => <Card dataArtist={artist} removeCard={(id)=>this.removeCard(id)} key={artist.id} moveRight={(id)=>this.moveRight(id)} moveLeft={(id)=>this.moveLeft(id)}/>)
                    }
                </section>
            </main>
            </React.Fragment>
        )
    }
}

export default Main