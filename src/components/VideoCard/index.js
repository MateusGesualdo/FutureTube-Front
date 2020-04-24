import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
    box-sizing: border-box;
    padding: 1em;
    margin: 1em auto;
    border-radius: 5px;
    background-color: #8b000030;
    max-width:800px
`

const FlexContainer = styled.div`
    display: flex;       
    align-items: flex-start;
`

const H2 = styled.h2`
    margin: 15px 15px 0 0;
`

const Video = styled.video`max-width:100%`

const Img = styled.img` 
    border-radius: 15px;
    margin: 15px 15px 0 0;
`

export default function VideoCard(props) {
    return (
        <Div>
            <Video
                id={props.id}
                src={props.src}
                width={props.width}
                controls={props.controls}
                autoplay={props.autoplay}
                onClick={props.onClick}
            />
            <FlexContainer>

                {
                    props.profilePicture &&
                    <Img
                        src={props.profilePicture}
                        width='30'
                        title={props.name}
                        alt="Future Tube"
                        onClick={props.onPictureClick}
                    />}

                <div id={props.id}>
                    <H2>{props.title}</H2>
                    <p>{props.description}</p>
                    {props.children}
                </div>

            </FlexContainer>
        </Div>
    )
}