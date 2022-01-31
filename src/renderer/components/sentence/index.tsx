import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  Stack,
  TextField,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
  CardHeader,
  IconButton,
  Collapse,
  Typography,
} from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DialogueSentence from '../../models/dialogue_sentence';
import useThrottle from '../../utils/use_throttle';
import DialogueItemActor from 'renderer/models/dialogue_actor';

const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  marginRight: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ActorContainer = ({
  initialData,
  onChange,
}: {
  initialData: DialogueItemActor | null;
  onChange?: (value: DialogueItemActor, i: number) => void;
}) => {
  const [data, setData] = useState(initialData || new DialogueItemActor());
  const onSpeakerChange = (e) => {
    setData((prev) => {
      prev.speaker = e.target.checked;
      return prev.clone();
    });
  };

  useEffect(() => {
    if (onChange) {
      onChange(data);
    }
  }, [data, onChange]);
  return (
    <Stack spacing={1}>
      <FormControlLabel
        control={
          <Checkbox
            checked={data.speaker}
            onChange={onSpeakerChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label="Speaker"
      />
      <img
        style={{
          width: '128px',
          height: '128px',
          background: '#ccc',
        }}
      />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Actor</InputLabel>
        <Select label="Actor" size="small" value={data?.actorId}>
          {/* <MenuItem value="">
              <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Protrait</InputLabel>
        <Select label="Protrait" disabled size="small" value={data?.protraitId}>
          {/* <MenuItem value="">
              <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </Stack>
  );
};

const Sentence = ({
  initialExpanded = true,
  initialData,
  onChange,
  onDelete,
  index,
}: {
  initialExpanded?: boolean;
  initialData: DialogueSentence;
  index: number;
  onChange?: (value: DialogueSentence, index: number) => void;
  onDelete?: (index: number) => void;
}) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  const [data, setData] = useState<DialogueSentence>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const settingsMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    setData((prev) => {
      if (!prev) {
        return initialData;
      }
      return prev;
    });
  }, [initialData]);

  const handleExpandClick = () => {
    setExpanded((prev) => {
      return !prev;
    });
  };

  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  const onContentChange = useThrottle((e) => {
    setData((prev) => {
      if (!prev) {
        return prev;
      }
      prev.content = e.target.value;
      return prev.clone();
    });
  }, 50);

  const onLeftActorChange = useCallback((value: DialogueItemActor) => {
    setData((prev) => {
      if (!prev) {
        return prev;
      }
      prev.leftActor = value;
      return prev.clone();
    });
  }, []);
  useEffect(() => {
    console.log('dss');
    if (onChange && data) {
      onChange(data, index);
    }
  }, [onChange, data, index]);
  return (
    <Card>
      <CardHeader
        action={
          <>
            <IconButton
              aria-label="settings"
              aria-controls={settingsMenuOpen ? 'settings-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={settingsMenuOpen ? 'true' : undefined}
              onClick={handleSettingsClick}
            >
              <MoreVertIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </>
        }
        subheader={
          <Typography
            components="div"
            variant="subtitle2"
            noWrap={true}
            sx={{
              maxWidth: '500px',
            }}
          >
            {data?.content}
          </Typography>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <ActorContainer
              initialData={data?.leftActor}
              onChange={onLeftActorChange}
            />
            <TextField
              label="Content"
              multiline
              defaultValue={data?.content}
              rows={10}
              sx={{
                width: '100%',
              }}
              onChange={onContentChange}
            />
            <ActorContainer initialData={data?.rightActor} />
          </Stack>
        </CardContent>
      </Collapse>
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        open={settingsMenuOpen}
        onClose={handleSettingsClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            if (onDelete) onDelete(index);
            handleSettingsClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};
export default Sentence;
