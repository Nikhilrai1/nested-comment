import { Avatar, Box, CssBaseline, Typography } from "@mui/material"

const PostCard = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: "column" }}>

            {/* upper feed profile */}
            <Box sx={{
                display: 'flex',
                alignItems: "center",
                py: "15px",
                px: '34px',
                gap: "15px",
            }}>
                <Box component={"div"} sx={{ m: 1, height: "46px", width: "46px", objectFit: "contain" }}>
                    <img src="/profile/profile1.webp" alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center",
                }}>
                    <Typography sx={{ fontWeight: 600 }}>Adam Smith</Typography>
                    <Typography component={"p"} sx={{ color: "#8F8F8F" }}>2d</Typography>
                </Box>
            </Box>
            <CssBaseline />
        </Box>
    )
}

export default PostCard
