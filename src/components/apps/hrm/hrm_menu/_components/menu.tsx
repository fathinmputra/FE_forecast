import CardMenu from '@/components/apps/hrm/hrm_menu/_components/card-menu';

import { ListMenu } from '@/constant/list_menu';
import { SingleMenu } from '@/helpers/utils/side_menu/menu';

const Recruitment = () => {
  const Menu: SingleMenu | undefined = ListMenu.find(
    menu => menu.label === 'HRM',
  );

  return (
    <div className='panel border-white-light px-0'>
      <div className='mb-5 px-5 text-center text-2xl font-bold'>
        <h3>Human Resource Management Menu</h3>
      </div>
      <div className='mb-5 grid grid-cols-1 gap-x-5 px-5 md:grid-cols-2 md:items-center'>
        {Menu?.sub_menu?.map((menu, index) => {
          return (
            <CardMenu
              key={index}
              title={menu.label}
              description='lorem ipsum dolor sit amet, consectetur adipiscing elit.'
              icon={menu.icon}
              path={menu.path}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Recruitment;
