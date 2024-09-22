import { BiBasket } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { CiMoneyBill } from 'react-icons/ci';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaRunning } from 'react-icons/fa';
import { FiMap } from 'react-icons/fi';
import { GrDocumentPerformance } from 'react-icons/gr';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { IoDocumentsOutline } from 'react-icons/io5';
import { LiaFileContractSolid } from 'react-icons/lia';
import { LiaCertificateSolid } from 'react-icons/lia';
import { LuFileLock2 } from 'react-icons/lu';
import { MdShowChart } from 'react-icons/md';
import { RxEnvelopeOpen } from 'react-icons/rx';
import { RxEnvelopeClosed } from 'react-icons/rx';
import { TbFileSearch } from 'react-icons/tb';
import { TbBasketSearch } from 'react-icons/tb';
import { TbBasketUp } from 'react-icons/tb';
import { TbChecklist } from 'react-icons/tb';
import { TbShieldCheck } from 'react-icons/tb';
import { TbDashboard } from 'react-icons/tb';

import { getTranslation } from '@/lib/lang/i18n';

// import IconArchive from '@/components/icon/icon-archive';
import IconBox from '@/components/icon/icon-box';

// import IconMoneyReceive from '@/components/icon/icon-money-receive';
// import IconMoneySend from '@/components/icon/icon-money-send';
// import IconShoppingBag from '@/components/icon/icon-shopping-bag';
// import IconShoppingCart from '@/components/icon/icon-shopping-cart';
// import IconUsersGroup from '@/components/icon/icon-users-group';
import { SingleMenu } from '@/helpers/utils/side_menu/menu';
const { t } = getTranslation();

export const ListMenu: SingleMenu[] = [
  {
    label: t('polygon_map'),
    icon: FiMap,
    path: '/polygon_map',
    type: 'link',
    has_sub_menu: false,
  },
  {
    label: t('marker_map'),
    icon: FaMapMarkerAlt,
    path: '/marker_map',
    type: 'link',
    has_sub_menu: false,
  },
  {
    label: t('supplier_profile'),
    icon: CgProfile,
    path: '/supplier_profile',
    type: 'dropdown',
    has_sub_menu: true,
    sub_menu: [
      {
        label: t('general'),
        icon: IoMdInformationCircleOutline,
        path: '/supplier_profile/general',
        type: 'link',
      },
      {
        label: t('financial'),
        icon: CiMoneyBill,
        path: '/supplier_profile/financial',
        type: 'link',
      },
      {
        label: t('certification'),
        icon: LiaCertificateSolid,
        path: '/supplier_profile/certification',
        type: 'link',
      },
      {
        label: t('experience'),
        icon: FaRunning,
        path: '/supplier_profile/experience',
        type: 'link',
      },
      {
        label: t('document'),
        icon: IoDocumentsOutline,
        path: '/supplier_profile/document',
        type: 'link',
      },
    ],
  },
  {
    label: t('procurement'),
    icon: GrDocumentPerformance,
    path: '/procurement',
    type: 'dropdown',
    has_sub_menu: true,
    sub_menu: [
      {
        label: t('open_procurement'),
        icon: RxEnvelopeOpen,
        path: '/procurement/open',
        type: 'link',
      },
      {
        label: t('invitation_procurement'),
        icon: RxEnvelopeClosed,
        path: '/procurement/invitation',
        type: 'link',
      },
    ],
  },
  {
    label: t('tender'),
    icon: TbBasketSearch,
    path: '/tender',
    type: 'dropdown',
    has_sub_menu: true,
    sub_menu: [
      {
        label: t('open_tender'),
        icon: BiBasket,
        path: '/tender/open',
        type: 'link',
      },
      {
        label: t('invitation_tender'),
        icon: TbBasketUp,
        path: '/tender/invitation',
        type: 'link',
      },
    ],
  },
  {
    label: t('contract_management'),
    icon: LiaFileContractSolid,
    path: '/contract_management',
    type: 'dropdown',
    has_sub_menu: true,
    sub_menu: [
      {
        label: t('open_contract'),
        icon: TbFileSearch,
        path: '/contract_management/open',
        type: 'link',
      },
      {
        label: t('invitation_tender'),
        icon: LuFileLock2,
        path: '/contract_management/invitation',
        type: 'link',
      },
    ],
  },
  {
    label: t('Quality Management'),
    icon: TbChecklist,
    path: '/quality/quality_dashboard',
    type: 'dropdown',
    has_sub_menu: true,
    sub_menu: [
      {
        label: t('Quality Dashboard'),
        icon: MdShowChart,
        path: '/quality/quality_dashboard',
        type: 'link',
        has_sub_menu: false,
      },
      {
        label: t('Quality Level'),
        icon: TbDashboard,
        path: '/quality/quality_level',
        type: 'dropdown',
        has_sub_menu: true,
        sub_menu: [
          {
            label: 'Automatic',
            icon: IconBox, // Pastikan IconBox sudah diimport
            path: '/quality/quality_level/automatic',
            type: 'link',
          },
          {
            label: 'Manual',
            icon: IconBox, // Pastikan IconBox sudah diimport
            path: '/quality/quality_level/manual',
            type: 'link',
          },
        ],
      },
      {
        label: t('Manual Assessment'),
        icon: TbShieldCheck,
        path: '/quality/manual_assessment',
        type: 'link',
        has_sub_menu: false,
      },
    ],
  },
];
