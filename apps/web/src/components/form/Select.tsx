import { Label } from './Label';
import { HeadlessList } from './HeadlessList';

export interface OptionType {
  label: string;
  value: string;
  disabled?: boolean;
  hidden?: boolean;
}

export interface SelectProps {
  id: string;
  options: OptionType[];
  label?: string;
  menuPlacement?: 'bottom' | 'top';
  isDisabled?: boolean;
}

export interface BasicSelectProps extends SelectProps {
  value: any;
  onChange: (value: any) => void;
}

export interface MultiSelectProps extends SelectProps {
  value: any;
  onChange: (value: any) => void;
}

export const BasicSelect = (props: BasicSelectProps) => {
  const { id, value, label, options, onChange, menuPlacement, isDisabled } = props;

  return (
    <>
      <SelectLabel id={id} label={label} />
      <HeadlessList
        id={id}
        options={options}
        value={value}
        onChange={value => onChange(value as string)}
        menuPlacement={menuPlacement}
        isDisabled={isDisabled}
      />
    </>
  );
};

export const MultiSelect2 = (props: MultiSelectProps) => {
  const { id, value, label, options, onChange, menuPlacement } = props;

  return (
    <div>
      <SelectLabel id={id} label={label} />
      <HeadlessList
        isMulti
        id={id}
        options={options}
        value={value}
        onChange={value => onChange(value as any)}
        menuPlacement={menuPlacement}
      />
    </div>
  );
};

const SelectLabel = ({ id, label }: { id: string; label?: string }) => {
  return (
    <>
      {label && (
        <div className='mb-2'>
          <Label htmlFor={id}>{label}</Label>
        </div>
      )}
    </>
  );
};

export const Option: React.FC<OptionType> = ({ label, value, disabled, hidden }) => {
  return (
    <option value={value} key={value} disabled={disabled} hidden={hidden}>
      {label}
    </option>
  );
};
