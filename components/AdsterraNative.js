'use client';
import {useEffect, useRef} from 'react';

const zone='ca68ee9efe8d7fb7a77d02b95cc233a7';
export default function AdsterraNative({className=''}) {
  const host=useRef(null);
  useEffect(()=>{
    const node=host.current;
    if(!node)return;
    const script=document.createElement('script');
    script.async=true;
    script.setAttribute('data-cfasync','false');
    script.src='https://pl31849723.profitableratecpmnetwork.com/'+zone+'/invoke.js';
    node.appendChild(script);
    return ()=>{script.remove();};
  },[]);
  return <aside className={'bb-native-ad '+className} aria-label="विज्ञापन"><span className="bb-ad-label">विज्ञापन</span><div ref={host}><div id={'container-'+zone}/></div></aside>;
}
