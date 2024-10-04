'use client';

import { Section, Cell, Image, List, Banner, Button } from '@telegram-apps/telegram-ui';
import { Link } from '@/components/Link/Link';
import tonSvg from './_assets/ton.svg';
import { MessageCircle, Minimize, Spade } from 'lucide-react';
import { initViewport, useInitData } from '@telegram-apps/sdk-react';
import { useEffect, useState } from 'react';
import { createUser, fetchUser } from './server';
import { getPlayerBalance } from '@/context/Casino/Blackjack/Server';
import spaceBG from './_assets/space-bg.jpg';

export default function Home() {

  const [viewport] = initViewport();

  const initData = useInitData();
  const [userBalance, setUserBalance] = useState(0);
  const [userTONAddress, setUserTONAddress] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (initData?.user) {
      const userId = initData.user.id;
      fetchUser({
        telegram_id: userId
      }).then((user) => {
        if (!user && initData.user) {
          createUser({
            telegram_id: userId,
            telegram_name: initData.user.username
          })
        } else {
          setUserTONAddress(user.ton_address);
        }
      })
        .finally(() => {
          getPlayerBalance(userId).then((balance) => {
            setUserBalance(balance);
          });
        });
    }
  }, [initData]);

  useEffect(() => {
    const expand = async () => {
      const vp = await viewport;
      vp.expand();
    };
    expand();
  }, [])

  return (
    <List>    
      <Banner
        header='Welcome to Casino!'
        subheader='Play Blackjack and Belot with your friends!'
        description="This is a demo version of the Casino app. Please, be aware that this is a test version and tokens don’t have real value."
        background={<Image src={spaceBG.src} style={{width: '100%', height: '100%'}} />}        
      >
        <Button
            onClick={() => {
              window.location.href = '/casino';
            }}
          >
            Play now
          </Button>
      </Banner>
      <Section
        // header="Available Apps"
      >
        <Link href='/casino'>
          <Cell
            before={<Spade style={{ color: 'white', backgroundColor: 'red', padding: '4', borderRadius: '6px', width: '100%', height: '100%' }} />}
            subtitle={`Play with ${process.env.NEXT_PUBLIC_TOKEN_TICKER}`}>Casino</Cell>
        </Link>
      </Section>
      <Section
        header='Wallet'
      >
        {
          !userTONAddress ? (
            <Link href='/ton-connect'>
              <Cell
                before={<Image src={tonSvg.src} style={{ backgroundColor: '#007AFF' }} />}
                subtitle='Connect your TON wallet'
              >
                TON Connect
              </Cell>
            </Link>
          ) : (
            <>
              <Cell
                before={<Image src={tonSvg.src} style={{ backgroundColor: '#007AFF' }} />}
                subtitle='Your Balance'
              >
                {process.env.NEXT_PUBLIC_TOKEN_TICKER} {userBalance}
              </Cell>
              <Cell
                // before={<Spade style={{ color: 'white', backgroundColor: 'red', padding: '4', borderRadius: '6px' }} />}
                subtitle={`Your TON Address`}>
                {userTONAddress.slice(0, 6)}...{userTONAddress.slice(-6)}
              </Cell>
            </>

          )
        }
      </Section>
      <Section
        header='Version'
      >
        <Cell>
          0.0.6
        </Cell>
      </Section>  
      {/* <Section
        header='Developer'
        footer='These pages help developer to learn more about current launch information'
      >
        <Link href='/init-data'>
          <Cell subtitle='User data, chat information, technical data'>Init Data</Cell>
        </Link>
        <Link href='/launch-params'>
          <Cell subtitle='Platform identifier, Mini Apps version, etc.'>Launch Parameters</Cell>
        </Link>
        <Link href='/theme-params'>
          <Cell subtitle='Telegram application palette information'>Theme Parameters</Cell>
        </Link>
      </Section> */}
    </List>
  );
}
