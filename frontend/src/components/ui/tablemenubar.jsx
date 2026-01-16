import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from '@/components/ui/menubar';
import { Button } from './button';

export function TableMenubar({ config, reset }) {
  return (
    <Menubar className={'px-3 py-4'}>
      {config.map((menu) => (
        <MenubarMenu key={menu.title}>
          <MenubarTrigger>{menu.title}</MenubarTrigger>
          <MenubarContent>
            {menu.items.map((item, idx) =>
              item.separator ? (
                <MenubarSeparator key={idx} />
              ) : (
                <MenubarItem key={idx} onClick={item.action}>
                  {item.label}
                </MenubarItem>
              )
            )}
          </MenubarContent>
        </MenubarMenu>
      ))}
      <Button
        variant="ghost"
        className="text-red-600 hover:text-red-700 bg-transparent h-[30px] px-3 rounded-0 py-1"
        onClick={(e) => {
          e.preventDefault();
          reset?.();
        }}
      >
        Reset
      </Button>
    </Menubar>
  );
}
