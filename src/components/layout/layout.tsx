import * as React from "react";
import {useState} from "react";
import styled from "styled-components";
import {CellStatus} from "../../interfaces/cell-status";
import Cell from "../cell";

const Body = styled.div`
    display: grid;
    grid-template-areas:
        "header header header"
        "margin mainSpace margin1";
    grid-template-rows: 5rem 1fr;
    grid-template-columns: 20% 1fr 20%;
    grid-gap: 0rem;
    height: 100vh;
    margin: 0;
    background: linear-gradient(180deg, #310050 0%, #231329 100%);
    font-family: 'Roboto';
   
`;
const commonStyle = () => `
    padding: 20px;
`;
const Header = styled.header`
    grid-area: header;
    display: flex;
    flex-flow: row nowrap;
    border-bottom: 2px solid #280635;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h1`
  padding: 0 2rem;
  font-size: 1.25rem;
  color: #ffffff;
`
const FAB = styled.button`
  height: 100%;
  background-color: transparent;
  padding: 0 2rem;
  border: none;
  color: #ffffff;
  font-size: 1rem;
  line-height: 2rem;
  margin: 0;
  transition: color ease 0.2s,
  background-color ease 0.2s;
  
  &:before {
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    font-size: 1.25rem;
    line-height: 2rem;
    content: "+";
  }
  
  &:hover {
    background-color: #5A3472;
  }
  
  &:active {
    background-color: #ffffff;
    color: #5A3472;
  }
`;

const MainSpace = styled.main`
    ${commonStyle};
    grid-area: mainSpace;
    overflow-y: scroll;
    text-align: center;
    color: #ffffff;
`;

const deadLimit = 3;
const liveLimit = 2;
const mainTitle = "Клеточное наполнение";
const buttonText = "СOТВОРИТЬ";
const hintText = "Не создано ни одной клетки. Нажми кнопку \"СОТВОРИТЬ\".";

const lastThreeIsDead = (cells: CellStatus[]): boolean => {
    return cells.length > deadLimit - 1 &&
        cells.slice(cells.length - deadLimit, cells.length)
            .every((cellStatus: CellStatus) => cellStatus === CellStatus.Dead);
}

const lastTwoIsLive = (cells: CellStatus[]): boolean => {
    return cells.length > liveLimit - 1 &&
        cells.slice(cells.length - liveLimit, cells.length)
            .every((cellStatus: CellStatus) => cellStatus === CellStatus.Live);
}

export const Layout = function () {
    const [cells, setCells]: [CellStatus[], any] = useState([]);

    const onCellAdd = () => {
        const newCell = Math.random() > 0.5 ? CellStatus.Live : CellStatus.Dead;
        let newCells = [...cells, newCell];

        checkConditions(newCells);

        setCells(newCells);
    }

    const checkConditions = (newCells: CellStatus[]) => {
        if (lastThreeIsDead(newCells) && newCells.length > deadLimit) {
            newCells[newCells.length - deadLimit - 1] = CellStatus.Dead;
        }
        if (lastTwoIsLive(newCells)) {
            newCells = [...newCells, CellStatus.Life];
        }

        return newCells;
    }

    return (
        <Body>
            <Header>
                <Title>{mainTitle}</Title>
                <FAB onClick={onCellAdd}>{buttonText}</FAB>
            </Header>
            <MainSpace>
                {cells.length > 0 ?
                    cells.map((cellStatus, index) =>
                        <Cell key={`cell_${index}`} status={cellStatus}/>).reverse()
                    :
                    hintText
                }
            </MainSpace>
        </Body>
    );
};
