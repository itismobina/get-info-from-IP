import React, {Component} from "react";
import {Oval} from "react-loader-spinner";

export default class IpInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            info: null,
            isLoading: true
        }

    }

    async getIp() {
        const response = await fetch('https://api.ipify.org?format=json');
        return (await response.json()).ip;
    }

    async getInfo() {
        const ip = await this.getIp();
        const res = await fetch(`http://ipwhois.app/json/${ip}`);
        return await res.json();
    }

    componentDidMount() {
        this.getInfo().then((data) => {
            this.setState({
                isLoading : false,
                info: data
            })
        })
    }


    render() {
        return (
            <div className={"w-fit flex justify-center items-center"}>
                {
                    this.state.isLoading ?
                        <Oval
                            visible={true}
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        /> :
                        <div className="card-container flex justify-center items-center flex-col py-10">
                            <span className="info">Info</span>
                            <img className="round" src={this.state.info.country_flag} alt="brazil"/>
                            <h3>{this.state.info.country}</h3>
                            <h6>{this.state.info.city}</h6>
                            <p>isp: {this.state.info.isp}</p>
                            <div className="footer">
                                <p>IP: {this.state.info.ip}</p>
                                <p>latitude: {this.state.info.latitude}</p>
                                <p>longitude: {this.state.info.longitude}</p>
                            </div>
                        </div>
                }
            </div>

        )
    }
}