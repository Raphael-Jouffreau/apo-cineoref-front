// ? Import modules
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// ? Import style
import './styles.scss';

// ? Composant
function TopContributor() {
  const contributorsData = useSelector(({ contributors }) => contributors.topContributors);

  return (
    <div className="contributors w-1/5 h-fit p-8 cursor-context-menu text-[1.25rem] font-bold rounded-xl tablet:hidden">
      <h2 className="contributors-title mb-2.5 text-3xl text-center">Top contributeurs</h2>
      <ul>
        {contributorsData.map((contributor, index) => (
          <li className="p-1.5" key={contributor.username}>
            <Link to={`/user/${contributor.id}/profile`} className="contributors-links"> {index + 1} - {contributor.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(TopContributor);
