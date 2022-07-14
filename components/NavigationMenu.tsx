import React, {
  FC,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  LegacyRef,
  ReactElement,
  useEffect,
  useState,
} from 'react'
import { Disclosure, Transition, Popover } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { usePopper } from 'react-popper'
import { createPortal } from 'react-dom'

export interface MenuItem {
  slug: string
  label: string
  icon?: ReactElement | null,
  children?: MenuItem[]
}

export interface NavigationMenuProps {
  menu?: MenuItem[];
  collapsed?:boolean;
  className?:string;
  bgColor?:string;
  textColor?:string;
  onClick? : (item:MenuItem) => void;
}

const NavigationMenu: FC<NavigationMenuProps> = ({
  menu = [],
  collapsed = false,
  onClick,
  className,
  ...otherProps
}) : any => {

  const [current, setCurrent] = useState("")
  const [sezioni, setSezioni] = useState<MenuItem[]>([])

  useEffect(() => {
    setSezioni([...menu])
    setCurrent("")
  }, [menu])

  const clicked = (item: MenuItem) => {
    setCurrent(current === item.slug ? "" : item.slug)
    onClick && onClick( item );
  }

  const collpsedStyle= collapsed ? "hidden " : "inline-block ";


  const CollapsedMenuItem = ( props: { menuItem: MenuItem, level:number } ) =>{
    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let { styles, attributes } = usePopper(referenceElement, popperElement, { placement: "right-start", modifiers: [
      {
        name: 'arrow',
        options: {
          padding: 5, // 5px from the edges of the popper
        },
      },
    ],})
    const icon = props.menuItem.icon ? props.menuItem.icon : props.menuItem.label.substring(0,1).toUpperCase();
    const hasChildren = props.menuItem && props.menuItem.children;

    const children = props.menuItem && props.menuItem.children && props.menuItem?.children?.length > 0 ? (<div
        className={`bg-black/20` }
      > { recursiveMenuItemRender( props.menuItem.children, props.level + 1 ) }
      </div>) : null;

        return ( <Popover>
        <Popover.Button ref={(item:any) => setReferenceElement(item) } className="text-center w-full hover:bg-white/10" ><div className="w-[40px] p-2 inline-block">{icon}</div></Popover.Button>
        {
        createPortal(
        <Popover.Panel
            ref={ (item:any) => setPopperElement(item) }
            style={styles.popper}
            {...attributes.popper}
        >
         <div className={["flex flex-col", otherProps.bgColor || "bg-indigo-800", otherProps.textColor || "text-white" ].join(" ")} >
             <div className='py-2 px-4 hover:bg-white/10'>{props.menuItem.label}</div>
             <div>{ children }</div>
         </div>
      </Popover.Panel>, document.body)
      }
    </Popover>)
  }

  const expandedMenuItem = (menuItem: MenuItem, level:number) =>{
    const icon = menuItem.icon ? (<div className="w-5 h-5 inline-block mr-2"> {menuItem.icon} </div>) : null
    const children = menuItem && menuItem.children && menuItem?.children?.length > 0 ? (<div
        className={`${
            menuItem.slug === current
            ? 'max-h-[500px] opacity-100 py-2'
            : 'max-h-0 opacity-0'
        } overflow-hidden duration-1000 transition-all ease-in-out bg-black/20`}
      > { recursiveMenuItemRender( menuItem.children, level + 1 ) }
      </div>) : null;

    return (<><div
    className={`${ level === 0 ? 'pl-4' : 'pl-8'  } pr-4 py-2 flex align-content-center w-full cursor-pointer hover:bg-white/10`}
    onClick={() => clicked(menuItem) }
  >
  {icon}
  <div >{menuItem.label}</div>
  {  menuItem && menuItem.children && menuItem.children.length > 0 ?
    <div className={collpsedStyle + " ml-auto w-5 h-5"} >
        <ChevronDownIcon className={`${menuItem.slug === current ? 'transform rotate-180' : ''} duration-500 transition ease-in-out`} />
    </div> : null }
  </div>
  {children}</>);
}


  const recursiveMenuItemRender = ( menu: MenuItem[], level:number = 0 ) => {
    const elements =  menu.map( (item:any) => {
       return (<li key={item.slug}>{ (collapsed && level==0) ? (<CollapsedMenuItem menuItem={item} level={level} /> ) : expandedMenuItem (item,level) }</li>);
    });
    return (<ul>{elements}</ul>);
  }

  return <div className={[className, otherProps.bgColor || "bg-indigo-800", otherProps.textColor || "white" ].join(" ")}>{recursiveMenuItemRender( sezioni )}</div>
}
export default NavigationMenu
