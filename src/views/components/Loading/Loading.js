import React from "react";
import ReactLoading from "react-loading";
import { Section, Article, Prop } from "./Config";
// import "./Loading.css";

function Loading(props) {
    return (
        <Section>
            <Article key={props.type}>
                <ReactLoading type={props.type} color="#000" />
                <Prop>{props.title}</Prop>
            </Article>
        </Section>
    )
}

export default Loading;