# Medpal Admin Dashboard - Component Guide

## Project Structure

```
src/app/
├── App.tsx                 # Main app with RouterProvider
├── routes.tsx              # Route configuration
├── layouts/
│   └── DashboardLayout.tsx # Main layout with Sidebar + Header + Outlet
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx     # Left navigation sidebar
│   │   └── Header.tsx      # Top navigation bar
│   └── ui/                 # Reusable UI components
│       ├── Button.tsx      # Customizable button (variants: primary, secondary, danger, success, outline)
│       ├── Modal.tsx       # Modal dialog with overlay
│       ├── Card.tsx        # Content card wrapper
│       ├── Input.tsx       # Form input field
│       ├── Select.tsx      # Dropdown select
│       ├── Badge.tsx       # Status badge (Active, Pending, Blocked, etc.)
│       ├── EmptyState.tsx  # No data placeholder
│       └── LoadingSkeleton.tsx # Loading state skeletons
└── pages/
    ├── DashboardPage.tsx   # Overview with stats and recent activity
    ├── UsersPage.tsx       # User management with add/edit modal
    ├── DoctorsPage.tsx     # Doctor approvals and management
    ├── PatientsPage.tsx    # Patient records and details
    ├── ReportsPage.tsx     # Analytics charts and reports
    ├── EmergencyPage.tsx   # SOS emergency cases
    ├── SettingsPage.tsx    # System and profile settings
    └── NotFoundPage.tsx    # 404 error page
```

## Key Features

### Navigation
- **React Router** with `react-router` package
- Active link highlighting in sidebar
- Nested routing with DashboardLayout

### Reusable Components

#### Button
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```
Variants: primary, secondary, danger, success, outline
Sizes: sm, md, lg

#### Modal
```tsx
<Modal isOpen={isOpen} onClose={onClose} title="Add User" size="md">
  {children}
</Modal>
```

#### Badge
```tsx
<Badge status="Active">Active</Badge>
```
Statuses: Active (green), Pending (yellow), Blocked (red), Critical, High, Medium, Low

### Pages Overview

1. **Dashboard**: Stats cards, recent users table, emergency alerts
2. **Users Management**: Full CRUD with modal forms
3. **Doctors**: Approval system with pending and active sections
4. **Patients**: Patient records with detailed view modals
5. **Emergency**: SOS cases with priority indicators and response team
6. **Reports**: Analytics with Recharts (line, bar, pie charts)
7. **Settings**: Profile, notifications, security, system preferences

### Design System

**Colors**:
- Primary: Blue (#3b82f6)
- Success: Green (#10b981)
- Warning: Yellow (#f59e0b)
- Danger: Red (#ef4444)
- Purple: #a855f7

**Typography**: Default system sans-serif (Tailwind)

**Spacing**: Consistent padding (p-4, p-6) and gaps (gap-4, gap-6)

**Shadows**: Soft shadows (shadow-sm, shadow-md) on cards

**Borders**: Rounded corners (rounded-lg, rounded-xl)

## State Management

- Uses React useState for local component state
- Form handling in modals with controlled components
- CRUD operations for Users, Doctors, Patients

## Responsive Design

- Sidebar: Fixed at 256px (w-64) on desktop
- Main content: Left margin of 256px (ml-64)
- Grid layouts: Responsive with `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Tables: Scrollable on mobile with `overflow-x-auto`

## Usage Examples

### Adding a New Page

1. Create page component in `src/app/pages/NewPage.tsx`
2. Add route in `src/app/routes.tsx`
3. Add navigation link in `src/app/components/layout/Sidebar.tsx`

### Creating a Modal Form

```tsx
const [isModalOpen, setIsModalOpen] = useState(false);

<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Form Title">
  <form onSubmit={handleSubmit}>
    <Input label="Name" value={name} onChange={e => setName(e.target.value)} required />
    <Button type="submit">Submit</Button>
  </form>
</Modal>
```

### Empty States

```tsx
<EmptyState
  icon={<Icon size={32} />}
  title="No data found"
  description="Description here"
  action={<Button onClick={handleAdd}>Add Item</Button>}
/>
```

## Technologies Used

- **React 18.3.1** - UI framework
- **React Router 7.13.0** - Routing
- **Tailwind CSS 4.1.12** - Styling
- **Recharts 2.15.2** - Charts
- **Lucide React 0.487.0** - Icons
- **TypeScript** - Type safety
