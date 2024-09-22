import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { usePopper } from 'react-popper';

interface DropdownProps {
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'auto'
    | 'bottom-end'
    | 'bottom-start'
    | 'top-end'
    | 'top-start';
  offset?: [number, number];
  btnClassName?: string;
  button: React.ReactNode;
  children: React.ReactNode;
}

interface DropdownHandle {
  close: () => void;
}

const Dropdown: ForwardRefRenderFunction<DropdownHandle, DropdownProps> = (
  props,
  forwardedRef,
) => {
  const [visibility, setVisibility] = useState<boolean>(false);

  const referenceRef = useRef<HTMLButtonElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement: props.placement || 'bottom-end',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: props.offset || [0, 10], // Adjusted default offset for better positioning
          },
        },
      ],
    },
  );

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      referenceRef.current?.contains(event.target as Node) ||
      popperRef.current?.contains(event.target as Node)
    ) {
      return;
    }
    setVisibility(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  useImperativeHandle(forwardedRef, () => ({
    close() {
      setVisibility(false);
    },
  }));

  return (
    <>
      <button
        ref={referenceRef}
        type='button'
        className={props.btnClassName}
        onClick={() => setVisibility(!visibility)}
      >
        {props.button}
      </button>

      <div
        ref={popperRef}
        style={styles.popper}
        {...attributes.popper}
        className='z-50'
        onClick={() => setVisibility(!visibility)}
      >
        {visibility && props.children}
      </div>
    </>
  );
};

export default forwardRef(Dropdown);
