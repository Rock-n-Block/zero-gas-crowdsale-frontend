import { FC, ReactElement, useCallback, useRef, useState } from 'react';
import cn from 'clsx';

import s from './styles.module.scss';

export interface AccordionItem {
  title: (state: AccordionItemState) => string | ReactElement;
  content: (state: AccordionItemState) => string | ReactElement;
  wrapperClassName?: string;
}

export interface AccordionItemState extends AccordionItem {
  id: number;
  isOpen: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  canOpenSeveral?: boolean;
}

interface AccordionItemComponentProps extends AccordionItemState {
  handleToggleItem: (item: AccordionItemState) => void;
}

export const AccordionItemComponent: FC<AccordionItemComponentProps> = ({
  title,
  content,
  id,
  isOpen,
  handleToggleItem,
  wrapperClassName,
}) => {
  const state = { id, isOpen, title, content, wrapperClassName };
  return (
    <div className={cn(s.itemWrapper, wrapperClassName)}>
      <button
        className={cn(s.itemWrapperHead)}
        type="button"
        onClick={() => handleToggleItem(state)}
      >
        {title(state)}
      </button>
      <div className={cn(s.itemWrapperBody, { [s.active]: isOpen })}>{content(state)}</div>
    </div>
  );
};

export const Accordion: FC<AccordionProps> = ({ items, canOpenSeveral }) => {
  const idx = useRef(0);
  const [itemsState, setItemsState] = useState(
    items.map<AccordionItemState>((item) => ({
      ...item,
      // eslint-disable-next-line no-plusplus
      id: idx.current++,
      isOpen: false,
    })),
  );

  const handleToggleItem = useCallback(
    (item: AccordionItemState) => {
      const newState = itemsState.map((itemState) => {
        if (item.id === itemState.id) {
          return { ...item, isOpen: !item.isOpen };
        }
        return {
          ...itemState,
          isOpen: canOpenSeveral ? itemState.isOpen : false,
        };
      });
      setItemsState(newState);
    },
    [canOpenSeveral, itemsState],
  );

  if (!items.length) {
    return null;
  }

  return (
    <div className={s.wrapper}>
      {itemsState.map((item) => (
        <AccordionItemComponent key={item.id} {...item} handleToggleItem={handleToggleItem} />
      ))}
    </div>
  );
};