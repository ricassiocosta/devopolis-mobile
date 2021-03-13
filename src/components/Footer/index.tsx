import React, { useEffect, useState } from 'react';

import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HomeImg from '../../assets/home_unfocused.png';
import NewPostImg from '../../assets/new_post_unfocused.png';
import ChatImg from '../../assets/chat_unfocused.png';

import FocusedHomeImg from '../../assets/home_focused.png';
import FocusedNewPostImg from '../../assets/new_post_focused.png';
import FocusedChatImg from '../../assets/chat_focused.png';

import { Container } from './styles';

interface Options {
  home?: boolean;
  chat?: boolean;
  new_post?: boolean;
}

const Footer: React.FC<Options> = ({ home, chat, new_post }) => {
  const [btnHomeImg, setBtnHomeImg] = useState(HomeImg);
  const [btnNewPostImg, setBtnNewPostImg] = useState(NewPostImg);
  const [btnChatImg, setBtnChatImg] = useState(ChatImg);

  useEffect(() => {
    if (home) {
      setBtnHomeImg(FocusedHomeImg);
      setBtnNewPostImg(NewPostImg);
      setBtnChatImg(ChatImg);
    } else if (new_post) {
      setBtnNewPostImg(FocusedNewPostImg);
      setBtnHomeImg(HomeImg);
      setBtnChatImg(ChatImg);
    } else if (chat) {
      setBtnChatImg(FocusedChatImg);
      setBtnHomeImg(HomeImg);
      setBtnNewPostImg(NewPostImg);
    }
  }, [home, new_post, chat]);

  return (
    <Container>
      <TouchableOpacity>
        <Image source={btnNewPostImg} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={btnHomeImg} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={btnChatImg} />
      </TouchableOpacity>
    </Container>
  );
};
export default Footer;
