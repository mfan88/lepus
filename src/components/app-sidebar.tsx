import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";

const data = {
  navMain: [
    {
      title: "Invoice Management",
      url: "#",
      items: [
        {
          title: "View Past Invoices",
          url: "/invoiceManager",
        },
        {
          title: "Download Invoices",
          url: "#",
        },
      ],
    },
    {
      title: "Client Management",
      url: "#",
      items: [
        {
          title: "Client Dashboard",
          url: "#",
        },
        {
          title: "Add or Remove Clients",
          url: "#",
        },
        {
          title: "Edit Client Information",
          url: "#",
        },
      ],
    },
  ],
  settings: [
    {
      title: "Settings & Preferences",
      url: "#",
      items: [
        {
          title: "Workflow Settings",
          url: "#",
        },
        {
          title: "User Settings",
          url: "#",
        },
        {
          title: "App Preferences",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <NavLink to="/">
          <img src="../src/assets/lepus_logo.png" alt="lepus logo" />
        </NavLink>
      </SidebarHeader>
      <SidebarContent className="px-2">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton>
                      <a className="text-sm" href={item.url}>
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        {data.settings.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton>
                      <a className="text-sm" href={item.url}>
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarFooter>
    </Sidebar>
  );
}
