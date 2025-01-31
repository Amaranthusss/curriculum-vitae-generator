export interface DeleteListItemProps {
  name: number;
  remove: (index: number | number[]) => void;
  className?: string;
}
