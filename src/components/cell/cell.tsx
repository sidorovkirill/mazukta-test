import * as React from "react";
import styled, {keyframes, css} from "styled-components";
import {CellStatus} from "../../interfaces/cell-status";
import {useSpring, animated, useTransition} from 'react-spring'
import {memo, useEffect, useState} from "react";

const backgroundStyle = {
    [CellStatus.Live]: `linear-gradient(180deg, #FFB800 0%, #FFF7B0 100%)`,
    [CellStatus.Dead]: `linear-gradient(180deg, #0D658A 0%, #B0FFB4 100%)`,
    [CellStatus.Life]: `linear-gradient(180deg, #AD00FF 0%, #FFB0E9 100%)`
}

const titleText = {
    [CellStatus.Live]: 'Живая',
    [CellStatus.Dead]: 'Мёртвая',
    [CellStatus.Life]: 'Жизнь'
}

const jokeText = {
    [CellStatus.Live]: 'и шевелится!',
    [CellStatus.Dead]: 'или прикидывается',
    [CellStatus.Life]: 'Ку-ку!'
}

const Wrapper = styled(animated.div)`
    position: relative;
    margin-bottom: 0.25rem;
`;

const open = keyframes`
  from {
    background-color: #ffffff;
  }

  to {
    background-color: #ee7171;
  }
`;

const animation = () => css`
  ${open} 0.5s alternate linear 2;
`

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 1em;
  margin-bottom: 0.25rem;
  color: #000000;
  text-align: left;
  
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  
  animation: ${({animate}) => animate && animation()};
`

const Icon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  line-height: 2.5rem;
  border-radius: 1.25rem;
  background: ${props => backgroundStyle[props.status]};
  overflow: hidden;
`

const Hint = styled.div`
  margin-left: 1rem;
`
const Title = styled.div`
  font-size: 1.25rem;
`
const Joke = styled.div`
  font-size: 0.875rem;
`

interface CellProps {
    status: CellStatus,
}

export const Cell = memo(function (props: CellProps) {
    const {status} = props;
    const [statusIsChanged, setStatusChange] = useState(false);
    const [initialStatus] = useState(status);

    useEffect(() => {
        if (status !== initialStatus) {
            setStatusChange(true);
        }
    });

    const animProps = useSpring({
        config: {mass: 0.1, tension: 500, friction: 18},
        to: async (next) => {
            await next({height: '4.5rem', opacity: 1})
            await next({opacity: 1})
        },
        from: {
            height: '0rem',
            opacity: 0
        }
    });

    return <Wrapper className={'cell-wrapper'} style={animProps}>
        <Container animate={statusIsChanged}>
            <Icon status={status}>{status}</Icon>
            <Hint>
                <Title>{titleText[status]}</Title>
                <Joke>{jokeText[status]}</Joke>
            </Hint>
        </Container>
    </Wrapper>
});
