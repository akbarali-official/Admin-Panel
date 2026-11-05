const menuItems = [
  {
    id: 'dashboard-group',
    title: 'Dashboard',
    type: 'group',
    children: [
      { id: 'default', path: '/', title: 'Default', type: 'item', icon: 'GpsFixed', selected: true },
      { id: 'analytics', title: 'Analytics', type: 'item', icon: 'MonitorHeart' },
      { id: 'invoice', path: '/invoices', title: 'Invoice', type: 'item', icon: 'DescriptionOutlined' },
      { id: 'crm', path: '/customers', title: 'CRM', type: 'item', icon: 'SupportAgentOutlined', selected: true },
      { id: 'blog', path: '/blog', title: 'Blog', type: 'item', icon: 'ArticleOutlined' }
    ]
  },
  {
    id: 'widget-group',
    title: 'Widget',
    type: 'group',
    children: [
      { id: 'statistics', title: 'Statistics', type: 'item', icon: 'TrackChangesOutlined' },
      { id: 'data', title: 'Data', type: 'item', icon: 'AssignmentOutlined' },
      { id: 'chart', title: 'Chart', type: 'item', icon: 'SpeedOutlined' }
    ]
  },
  {
    id: 'application-group',
    title: 'Application',
    type: 'group',
    children: [
      { id: 'users', path: '/users', title: 'Users', type: 'collapse', icon: 'PersonAddAltOutlined' },
      { id: 'customer', path: '/customers', title: 'Customer', type: 'collapse', icon: 'HeadsetMicOutlined' },
      { id: 'order', path: '/orders', title: 'Order', type: 'collapse', icon: 'ShoppingCartOutlined' },
      { id: 'chat', title: 'Chat', type: 'item', icon: 'ForumOutlined' },
      { id: 'kanban', title: 'Kanban', type: 'item', icon: 'ViewKanbanOutlined' },
      { id: 'mail', title: 'Mail', type: 'item', icon: 'MailOutlined', selected: true },
      { id: 'calendar', title: 'Calendar', type: 'item', icon: 'CalendarMonthOutlined' },
      { id: 'contact', title: 'Contact', type: 'collapse', icon: 'ContactPageOutlined' },
      { id: 'e-commerce', path: '/products', title: 'E-commerce', type: 'collapse', icon: 'StorefrontOutlined' },
      { id: 'app-invoice', path: '/invoices', title: 'Invoice', type: 'collapse', icon: 'ReceiptLongOutlined' }
    ]
  },
  {
    id: 'forms-group',
    title: 'Forms',
    type: 'group',
    children: [
      { id: 'components', title: 'Components', type: 'collapse', icon: 'ViewModuleOutlined' },
      { id: 'plugins', title: 'Plugins', type: 'collapse', icon: 'ExtensionOutlined' },
      { id: 'layouts', title: 'Layouts', type: 'collapse', icon: 'DashboardCustomizeOutlined' },
      { id: 'table', title: 'Table', type: 'collapse', icon: 'TableChartOutlined' },
      { id: 'data-grid', title: 'Data Grid', type: 'collapse', icon: 'GridOnOutlined' },
      { id: 'charts', title: 'Charts', type: 'collapse', icon: 'ShowChartOutlined' },
      { id: 'map', title: 'Map', type: 'item', icon: 'MapOutlined' },
      { id: 'forms-validation', title: 'Forms Validation', type: 'collapse', icon: 'ChecklistOutlined' },
      { id: 'forms-wizard', title: 'Forms Wizard', type: 'item', icon: 'StairsOutlined' }
    ]
  },
  {
    id: 'ui-group',
    title: 'UI Element',
    type: 'group',
    children: [
      { id: 'basic', title: 'Basic', caption: '8+ Basic Components', type: 'collapse', icon: 'WidgetsOutlined', selected: true },
      { id: 'advance', title: 'Advance', type: 'collapse', icon: 'BuildOutlined' }
    ]
  },
  {
    id: 'sample-page-group',
    type: 'group',
    children: [{ id: 'sample-page', path: '/sample-page', title: 'Sample Page', type: 'item', icon: 'WebOutlined' }]
  },
  {
    id: 'pages-group',
    title: 'Pages',
    caption: 'Prebuild Pages',
    type: 'group',
    children: [
      { id: 'authentication', title: 'Authentication', type: 'collapse', icon: 'VpnKeyOutlined' },
      { id: 'pricing', title: 'Pricing', type: 'collapse', icon: 'SellOutlined' },
      { id: 'maintenance', title: 'Maintenance', type: 'collapse', icon: 'ConstructionOutlined' },
      { id: 'landing', title: 'Landing', type: 'item', icon: 'CampaignOutlined' },
      { id: 'contact-us', title: 'Contact US', type: 'item', icon: 'PhoneOutlined', selected: true },
      { id: 'faqs', path: '/faqs', title: 'FAQs', type: 'item', icon: 'HelpOutlineOutlined' },
      { id: 'privacy-policy', path: '/privacy-policy', title: 'Privacy Policy', type: 'item', icon: 'ShieldOutlined' }
    ]
  },
  {
    id: 'utilities-group',
    title: 'Utilities',
    type: 'group',
    children: [
      { id: 'typography', path: '/typography', title: 'Typography', type: 'item', icon: 'TextFieldsOutlined' },
      { id: 'color', path: '/color', title: 'Color', type: 'item', icon: 'PaletteOutlined' },
      { id: 'shadow', title: 'Shadow', type: 'item', icon: 'BlurOnOutlined' },
      { id: 'icons', title: 'Icons', type: 'collapse', icon: 'EmojiSymbolsOutlined' },
      { id: 'animation', title: 'Animation', type: 'item', icon: 'AnimationOutlined' },
      { id: 'grid-ui', title: 'Grid', type: 'item', icon: 'GridViewOutlined' }
    ]
  },
  {
    id: 'other-group',
    title: 'Others',
    type: 'group',
    children: [
      { id: 'menu-levels', title: 'Menu Levels', type: 'collapse', icon: 'MenuOutlined' },
      { id: 'sub-caption', title: 'Sub Caption Levels', caption: 'Caption Collapse', type: 'collapse', icon: 'LayersOutlined' },
      { id: 'disabled-menu', title: 'Disabled Menu', type: 'item', icon: 'BlockOutlined', disabled: true },
      { id: 'oval-chip', title: 'Oval Chip', type: 'item', icon: 'RadioButtonUncheckedOutlined', chip: { label: '9', color: 'primary' } },
      { id: 'avatar-menu', title: 'Avatar', type: 'item', icon: 'AccountCircleOutlined', chip: { label: 'coded', color: 'secondary', avatar: 'C' } },
      { id: 'outlined', title: 'Outlined', type: 'item', icon: 'CropSquareOutlined', chip: { label: 'outlined', variant: 'outlined' } },
      { id: 'documentation', title: 'Documentation', type: 'item', icon: 'MenuBookOutlined' },
      { id: 'roadmap', title: 'Roadmap', type: 'item', icon: 'AccountTreeOutlined' }
    ]
  }
]

export default menuItems