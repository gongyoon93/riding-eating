import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

interface ISnackbarItemProps {
  id: string;
  type: 'notice' | 'warning' | 'caution';
  message: string;
}

export const snackbarState = atom<ISnackbarItemProps[]>({
  key: `snackbarState/${uuidv4()}`,
  default: <ISnackbarItemProps[]>[],
});
