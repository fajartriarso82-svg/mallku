import AccountSettings from "@/components/scm/account-settings";

export const metadata = { title: "Pengaturan Distributor SCM" };

export default function ScmDistributorSettingsPage() {
  return <AccountSettings role="DISTRIBUTOR" />;
}
