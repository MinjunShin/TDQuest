import React, { useState } from 'react';
import styled from 'styled-components';
import {
  fontSize_h3_laptop,
  color_context_gray,
  color_menu_header_purple,
  color_border_yellow,
  color_context_beige,
  color_context_brown,
  color_white,
  fontSize_body_laptop,
  color_context_blue_light,
  color_context_beige_light,
} from '../../components/CommonStyle';
import crownIcon from '../../static/images/icons/Crown.png';

const Container = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  width: 100%;
  min-height: 400px;
  max-height: 550px;
  /* border: 1px solid ${color_border_yellow}; */
  display: grid;
  grid-template-rows: 40px 1fr;
  overflow: auto;
`;
const TitleContainer = styled.div`
  width: 100%;
  background-color: ${color_context_brown};
  display: flex;
  justify-content: center;
  img {
    height: 20px;
    align-self: center;
    margin-right: 5px;
  }
  h3 {
    font-size: ${fontSize_h3_laptop};
    height: 2rem;
    font-family: 'Fredoka One', cursive;
    color: ${color_white};
    align-self: center;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
  width: 100%;
`;

const Item = styled.div`
  width: 85%;
  border: none;
  background-color: ${color_white};
  min-height: 50px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  /* display: grid;
  grid-template-columns: 30px 1fr 30px;
  align-items: center; */
  img {
    height: 25px;
  }
  div {
    width: 100%;
    padding: 0 10px;
  }
`;

function RankingListContainer({
  title,
  icon, // title 앞에 있는 아이콘
  rankingList,
}: {
  title: string;
  icon?: string | undefined;
  rankingList?: any | undefined;
}) {
  console.log(rankingList);

  return (
    <Container bgColor={color_context_beige}>
      <TitleContainer>
        {icon ? (
          <img src={require(`../../static/images/${icon}`)} alt='icon' />
        ) : (
          ''
        )}
        <h3>{title}</h3>
      </TitleContainer>
      <ContentContainer>
        {rankingList
          ? rankingList.map((el: any, index: number) => (
              <Item key={el.id}>
                {index === 0 ? <img src={crownIcon} alt='icon' /> : ''}
                <div>{el.user.nickname}</div>
              </Item>
            ))
          : ''}
      </ContentContainer>
    </Container>
  );
}

export default RankingListContainer;
