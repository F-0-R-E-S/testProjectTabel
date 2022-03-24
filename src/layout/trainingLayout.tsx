import { Container, Skeleton } from "@mantine/core";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styled from 'styled-components'

export const TrainingLayout = () => {


    return (
        <ContainerBodyTraining>
            <ContainerBodyTrainingLeft>
                <ContainerBodyTrainingLeftNav>

                </ContainerBodyTrainingLeftNav>
            </ContainerBodyTrainingLeft>
            <ContainerBodyTrainingRight>
                <Suspense fallback={<Skeleton height={50} radius="sm" />}>
                    <Container size={1175}>
                        <Outlet />
                    </Container>
                </Suspense>
            </ContainerBodyTrainingRight>
        </ContainerBodyTraining>
    );
}


const ContainerBodyTraining = styled.div`
display: flex;
background: #F3F6F9;
`

const ContainerBodyTrainingLeft = styled.div`
width: 5%;
`

const ContainerBodyTrainingLeftNav = styled.nav`
    background: #7242E6;
    height: 100vh;
    top: 0;
    width: 5%;
    position: fixed;
`

const ContainerBodyTrainingRight = styled.div`
width: 95%;
margin-top: 86px;
`