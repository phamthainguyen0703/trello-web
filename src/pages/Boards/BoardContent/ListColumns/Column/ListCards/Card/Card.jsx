import { Card as MuiCard } from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Typography from "@mui/material/Typography";

function Card() {
  return (
    <MuiCard
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        overflow: "unset",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/433292403_432283125995111_185608653408899997_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=W3Pk0eNQItQAX_reCoo&_nc_ht=scontent.fsgn5-3.fna&oh=00_AfB2BCXzqfXZdTP2SPhZg9KaIpPiTPZCkKlBZj2hZw9Nvw&oe=65FECF36"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
        <Typography>PhamThaiNguyen MERN Stack</Typography>
      </CardContent>
      <CardActions sx={{ p: "0 4px 8px 4px" }}>
        <Button size="small" startIcon={<GroupIcon />}>
          {" "}
          20
        </Button>
        <Button size="small" startIcon={<CommentIcon />}>
          15
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
          10
        </Button>
      </CardActions>
    </MuiCard>
  );
}

export default Card;
