import { ReactElement, useState } from 'react';

export type TabsProps = {
  children: ReactElement[];
};

export const Tabs = ({ children }: TabsProps) => {
  const url = new URL(window.location.href);
  const activeTab = url.searchParams.get('activeTab') ?? '';
  const initialSelected = /\d/.test(activeTab) ? parseInt(activeTab) : 0;
  const [selected, setSelected] = useState(initialSelected);

  const handleTabChange = (index: number, title: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('activeTab', `${index}`);
    window.history.pushState({}, title, url.toString());
    setSelected(index);
  };

  return (
    <div>
      <ul>
        {children.map((elem, index) => (
          <li
            key={index}
            className={index === selected ? 'selected' : ''}
            onClick={() => handleTabChange(index, elem.props.title)}
          >
            {elem.props.title}
          </li>
        ))}
      </ul>
      <div className="tab">{children[selected]}</div>
    </div>
  );
};
