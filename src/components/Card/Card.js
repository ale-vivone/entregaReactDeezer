import React, {Component} from "react";
import './card.css';

class Card extends Component {
    constructor(){
        super();
        this.state={
            text: 'ver más',
            show: false,
        }
    }
    showMoreInfo(){
        if(this.state.show){
            this.setState({
                text: 'ver más',
                show: false,
            })
        } else {
            this.setState({
                text: 'ocultar',
                show: true,
            })
        }
    }
    //Si lo quieren hacer con una etiqueta a tienen que evitar que se envíe. Sino cambien por p o por un button.
    preventAndShow(event){
        event.preventDefault();
        this.showMoreInfo();
    }

    render(){
        return(
            <article className=''>
                <section className="navigation">
                    <div>
                        <i className="fas fa-chevron-left" onClick={()=>this.props.moveLeft(this.props.dataArtist.id)}></i>
                        <i className="fas fa-chevron-right" onClick={()=>this.props.moveRight(this.props.dataArtist.id)}></i>
                    </div>
                    <i className="far fa-window-close" onClick={ ()=>this.props.removeCard(this.props.dataArtist.id)}></i>
                </section>
                <main>
                    <img src={this.props.dataArtist.picture_medium} alt=""/>
                    <h3>{this.props.dataArtist.name}</h3>
                    <p className="description">Link: <a href={this.props.dataArtist.link}>{this.props.dataArtist.link}</a></p>
                    <section className={`aditional-info ${ this.state.show ? 'show' : 'hide'}`}>
                        <p>Track list: <a href={this.props.dataArtist.tracklist}>{this.props.dataArtist.tracklist}</a></p>
                        <p>Tiene radio: {this.props.dataArtist.radio ? 'Si' : 'No'} </p>
                        <p>Clasificación: {this.props.dataArtist.type}</p>
                    </section>
                    <a href="/" onClick={ (e)=>this.preventAndShow(e)}>{this.state.text}</a>
                </main>
            </article>
        )
    }
}

export default Card