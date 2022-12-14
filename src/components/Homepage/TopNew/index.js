/* eslint-disable import/no-extraneous-dependencies */
// ? Import modules
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaClosedCaptioning } from 'react-icons/fa';
import ClipboardJS from 'clipboard';
import Tippy from '@tippyjs/react';
import { setTablist } from '../../../features/topNewSlice';
import { setNewRefData } from '../../../features/refSlice';

// ? Import style
import './styles.scss';
import 'tippy.js/dist/tippy.css';

// ? Composant
function HomeList() {
  const dispatch = useDispatch();
  const tabList = useSelector(({ topNew }) => topNew.tabList);
  const newRef = useSelector(({ ref }) => ref.newRef);
  const topRef = useSelector(({ ref }) => ref.topRef);

  //* config module pour copier le texte
  const clipboard = new ClipboardJS('.copy-btn');
  clipboard.on('success', (e) => {
    e.clearSelection();
  });

  // Todo: trouver un moyen d'isoler le tooltip sur le bouton cliqué
  //* tooltip
  const [isVisible, setIsVisible] = useState(null);
  const handleClick = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  useEffect(() => {
    axios
      .get('https://cinoref-api.herokuapp.com/mostrecent')
      .then((res) => {
        dispatch(setNewRefData(res.data));
      });
    clipboard.destroy();
  }, []);

  return (
    <div className="citation w-3/4 mx-auto rounded-md text-center tablet:w-11/12">
      <nav className="flex justify-around items-center text-xl font-bold text-porange cursor-pointer tablet:text-base phone:text-[0.9rem]">
        <div
          onClick={() => dispatch(setTablist('newests'))}
          className={
            tabList !== 'newests'
              ? 'topleft w-1/2 p-2 rounded-tl-md inactiveTab'
              : 'topleft w-1/2 p-2 rounded-tl-md'
          }
        >
          Les plus récentes
        </div>
        <div
          onClick={() => dispatch(setTablist('topRated'))}
          className={
            tabList !== 'topRated'
              ? 'topright w-1/2 p-2 rounded-tr-md inactiveTab'
              : 'topright w-1/2 p-2 rounded-tr-md'
          }
        >
          Les mieux notées
        </div>
      </nav>
      <ul className="flex flex-col m-10 gap-8 items-start cursor-context-menu tablet:w-11/12 tablet:my-5 tablet:mx-auto tablet:items-center">
        {tabList === 'newests'
          ? newRef.map((ref) => (
            <li key={ref.ref} className="item flex flex-col justify-between w-3/5 py-4 px-10 rounded-md tablet:w-full">
              <Link to={`/ref/${ref.ref_id}`} className="item-ref my-3 text-lg">{ref.ref}</Link>
              <Link to={`/list/listcharacter/character/${ref.character_id}/refs`} className="ml-6 mt-6 max-h-14 text-left phone:text-sm">{ref.character}</Link>
              <Tippy content="Copié !" visible={isVisible}>
                <span className="cursor-pointer self-end" onClick={handleClick}>
                  <FaClosedCaptioning className="copy-btn inline text-porange text-[1.3rem]" data-clipboard-target=".item-ref" title="Copier le texte" />
                </span>
              </Tippy>
            </li>
          ))
          : topRef.map((data, index) => (
            index < 5 && (
              <li key={data.ref_id} className="item flex flex-col justify-between w-3/5 py-4 px-10 rounded-md tablet:w-full">
                <Link to={`/ref/${data.ref_id}`} className="item-ref my-3 text-lg">{data.ref}</Link>
                <Link to={`/list/listcharacter/character/${data.character_id}/refs`} className="ml-6 mt-6 max-h-14 text-left phone:text-sm">{data.character}</Link>
                <Tippy content="Copié !" visible={isVisible}>
                  <span className="cursor-pointer self-end" onClick={handleClick}>
                    <FaClosedCaptioning className="copy-btn inline text-porange text-[1.3rem]" data-clipboard-target=".item-ref" title="Copier le texte" />
                  </span>
                </Tippy>
              </li>
            )))}
      </ul>
    </div>
  );
}

export default React.memo(HomeList);
