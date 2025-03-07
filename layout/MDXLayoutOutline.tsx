import { useContext } from 'react'
import { Text, Flex, NewGDSDivider, Spacing, buildTransition } from '@edgeandnode/components'

import { DocumentContext } from '@/layout'
import { Link, EditPageLink } from '@/components'
import { useI18n } from '@/i18n'

export const MDXLayoutOutline = () => {
  const { outline, highlightedOutlineItemId } = useContext(DocumentContext)!
  const { t } = useI18n()

  if (outline.length === 0) {
    return <div />
  }

  return (
    <div
      sx={{
        zIndex: 1,
        position: 'sticky',
        top: '-1px',
        maxHeight: 'calc(100vh + 2px)',
        px: Spacing.M,
        py: Spacing.XL,
        overflowY: 'auto',
      }}
    >
      <Flex.Row>
        <EditPageLink />
      </Flex.Row>
      <NewGDSDivider sx={{ my: Spacing.XL }} />
      <nav sx={{ pr: '16px' }}>
        <Text.S10 as="header" color="White64" sx={{ mb: Spacing.M_L }}>
          {t('global.pageSections')}
        </Text.S10>
        <Text as="ul" size="14px" color="White48">
          {outline.map((outlineItem, outlineItemIndex) => {
            if (outlineItem.level > 3) {
              return null
            }
            return (
              <li key={outlineItemIndex}>
                <Link
                  href={`#${outlineItem.id}`}
                  sx={{
                    display: 'block',
                    pl: `${8 * Math.max(0, outlineItem.level - 2)}px`,
                    py: '6px',
                    color: outlineItem.id === highlightedOutlineItemId ? 'White88' : undefined,
                    '&:hover': { color: 'White' },
                    transition: buildTransition('COLORS'),
                  }}
                >
                  {outlineItem.title}
                </Link>
              </li>
            )
          })}
        </Text>
      </nav>
    </div>
  )
}
