import { Box } from "@mui/system";
import CommunicationPanel from "./communicationPanel";

export default function Communication(props: { firebaseApp: any }) {
  return (
    <Box>
      <CommunicationPanel firebaseApp={props.firebaseApp} />
    </Box>
  );
}
